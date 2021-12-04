import './Toast.css';

export const Toast = ({text}) => {
    return (
        <div className="alert alert-success toast">
            <i className="fas fa-check-circle"></i>
            <span> {text}</span>
        </div>
    )
}