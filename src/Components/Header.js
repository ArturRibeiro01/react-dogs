import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import {ReactComponent as Dogs} from '../Assets/dogs.svg'
import {UserContext} from '../UserContext'


const Header = () => {
    const {data, userLogout} = React.useContext(UserContext);
    return (
        <header className ={styles.header}>
            <nav className ={`${styles.nav} container`}> 
                <Link to="/" 
                className={styles.logo}
                aria-label="Dogs - Home" >
                    <Dogs />
                </Link>  
                { data ? (
                    <Link className={styles.login}to="/conta">
                        {data.nome}
                        <button onClick={userLogout}>Sair</button>
                    </Link>  
                ) : (
                <Link to="/Login"  className={styles.login}>
                    Login | Criar
                </Link>
                )}
                
            </nav>
        </header>
    )
}

export default Header
