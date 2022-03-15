export interface UserProps {
    name: string;
}

export interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserDataAPI {
    data: UserData
}

export interface UserState {
    userNumber: number,
    users: UserData[],
    user: UserData,
}