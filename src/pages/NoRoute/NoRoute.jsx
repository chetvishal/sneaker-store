import {useParams} from 'react-router-dom';

export const NoRoute = () => {

    const url = useParams();

    return(
        <div 
            style={{textAlign:"center"}}
        >
            <h1>404. That’s an error.</h1>
            <p>The requested URL {url["*"]} was not found on this server.</p>
        </div>
    )
}