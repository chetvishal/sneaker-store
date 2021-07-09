import './Toast.css';

export const Toast = ({text}) => {
    return (
        <div class="alert alert-success toast">
            <i class="fas fa-check-circle"></i>
            <span> {text}</span>
        </div>
    )
}