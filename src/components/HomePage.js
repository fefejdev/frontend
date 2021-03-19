import React from 'react'
import Bootstrap from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function HomePage() {
    const select = useSelector(state => state.authentication)

    
    
    return (

        <section className="main">
            <nav>
                <h1>CFB</h1>
                        <div className="btnContainerNav">
                            <Link to="/login"><button>Precisa de ajuda? Clique aqui</button></Link>
                            <Link to="/loginVoluntario"><button>Faça seu login</button></Link>
                            <Link to="/registroVoluntario"><button>Seja Voluntário</button></Link>
                        </div>
            </nav>

            <div className= "textContainer">
                <h1 className="title"> O que fazemos?</h1>
                <p className="text-body">Nós queremos ajudar a todos que precisam de conversar nesse momento. Então, criamos esta plataforma para que, quem precisa
                de uma conversinha possa tê-la com um de nossos voluntários.
                </p>
            </div>

            <div className= "textContainer">
                <h1 className="title"> Por que fazemos?</h1>
                <p className="text-body">Estamos passando por momentos muito difíceis recentemente, com isso a solidão e a depressão vem crescendo em ritmos alarmantes.
                Queremos oferecer para as pessoas um momento na qual elas podem conversar com alguem e se sentirem acolhidas.
                </p>
            </div>

            <div className= "textContainer">
                <h1 className="title"> Nosso público</h1>
                <p className="text-body"> Queremos atender qualquer pessoa, basta ela ter a vontade de conversar. Se você quiser ser atendido agora, basta clicar <Link to="/login">aqui </Link>
                 e colocar um nome de usuário, e logo poderá usar a ferramenta.
                </p>
            </div>
            <div className= "textContainer">
                <h1 className="title"> Quer ser um voluntário? </h1>
                <p className="text-body"> Estamos em uma constante necessidade de mais voluntários que estejam cursando a faculdade de psicologia, psicologos, psicanalistas, psiquiatras ou
                voluntários que tem algum tipo de certificação e já atuaram nessa àrea. Se você quiser fazer parte do nosso time basta clicar <Link to="/registroVoluntario">aqui</Link>.
                </p>
            </div>
        </section>
    )
}
