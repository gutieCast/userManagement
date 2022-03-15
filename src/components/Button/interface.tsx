export interface ButtonProps {
    type: 'add' | 'minus';
    title: string;
    onclick: () => void;
}