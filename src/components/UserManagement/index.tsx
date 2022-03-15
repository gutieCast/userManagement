import React from 'react';
import { Button } from '../Button'
import { Card } from '../Card';
import { UserData, UserProps, UserState } from './interface';
import './userManagement.scss'

class UserManagement extends React.Component<UserProps, UserState>{
    constructor(props: UserProps) {
        super(props);

        this.state = {
            userNumber: 1,
            users: [],
            user: {
                id: 0,
                email: "",
                first_name: "",
                last_name: "",
                avatar: ""
            }
        }
    }

    getUser = async (numb: number) => {
        try {
            if (this.state.userNumber > 0) {
                const response = await fetch(`https://reqres.in/api/users/${numb}`);
                console.log('get user ' + this.state.userNumber);

                if (!response.ok) {
                    const message = `An error has occured: ${response.status} - ${response.statusText}`;
                    throw new Error(message);
                }

                // To fetch a user
                const userDataAPI = await response.json();
                this.setState({ user: userDataAPI.data as UserData })
                this.setState({
                    users: [
                        ...this.state.users,
                        this.state.user
                    ]
                })
                console.log(this.state.users);
            }
        } catch (err: any) {
            alert(err.message);
        }
    }

    printUser = () => {
        this.state.users.map(({ id, first_name, last_name, avatar, email }) => {
            return (
                <li key={`${id + first_name + last_name}`}>
                    <Card name={first_name} lastname={last_name} img={avatar} email={email} />
                </li>
            )
        })
    }

    deleteUser = async () => {
        this.state.users.pop()
    }

    handleAddClick = () => {
        const { userNumber } = this.state;
        userNumber < 10 && this.setState({ userNumber: this.state.userNumber + 1 });
    }

    handleMinusClick = () => {
        const { userNumber } = this.state;
        userNumber > 1 && this.setState({ userNumber: this.state.userNumber - 1 });
        this.deleteUser();
    }

    // shouldComponentUpdate(nextProps: UserProps, nextState: UserState) {
    //     console.log('should Update ' + this.state.userNumber);
    //     return this.state.userNumber > 1 && this.state.userNumber <= 10
    // }

    componentDidMount() {
        this.getUser(this.state.userNumber);
        console.log('mount ' + this.state.userNumber);
        this.printUser()
    }

    componentDidUpdate(prevProps: UserProps, prevState: UserState, snapshot: any) {
        if (prevState.userNumber !== this.state.userNumber) {
            this.getUser(this.state.userNumber);
        }
        if (prevState.userNumber > this.state.userNumber) {
            this.deleteUser();
        }
        console.log('Update');
    }

    // componentWillUnmount() {
    //     console.log('Unmount');
    //     if (this.state.userNumber === 1) {
    //         window.removeEventListener('click', this.handleMinusClick);
    //     } else if (this.state.userNumber === 10) {
    //         window.removeEventListener('click', this.handleAddClick);
    //     }
    // }

    render() {
        const { name } = this.props
        const { users, user, userNumber } = this.state;
        const { id, first_name, last_name, email, avatar } = user;
        console.log('render ' + userNumber);

        return (
            <div className="user-management">
                <h1 className="main-title">{name}</h1>
                <h3>Number of users: {userNumber}</h3>
                <Button title='Minus' type='minus' onclick={this.handleMinusClick} />
                <Button title="Add" type="add" onclick={this.handleAddClick} />
                <ul className="users-list" title='users'>
                    {users.map(({ id, first_name, last_name, email, avatar }) => {
                        return (
                            <li key={`key_id_${id}`}>
                                <Card name={first_name} lastname={last_name} img={avatar} email={email} />
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

export { UserManagement }
