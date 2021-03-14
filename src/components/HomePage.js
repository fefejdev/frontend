import React from 'react'
import Bootstrap from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useAuth} from '../contexts/AutenticaContext'

export default function HomePage() {
    const {currentUser, logout} = useAuth()
    return (

        <section className="main">
            <nav>
                <h1>CFB</h1>
                {currentUser ?(
                    <>
                        <Link to="/dashboard"><button>Ir para a Dashboard</button></Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <div className="btnContainerNav">
                            <Link to="/login"><button>Precisa de ajuda? Clique aqui</button></Link>
                            <Link to="/voluntarioLogin"><button>Faça seu login</button></Link>
                            <Link to="/registroVoluntario"><button>Seja Voluntário</button></Link>
                        </div>
                    </>
                )}
                
            </nav>

            <div className= "textContainer">oi</div>
        </section>
    )
}
