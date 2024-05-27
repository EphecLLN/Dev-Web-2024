import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import "../App.css"
import { Link } from "react-router-dom";
import {Button} from "./ui/button";
import { frFR } from "@clerk/localizations";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const HeaderBase = ({children}) => {
    const styles_nav = {
        display: "inline-block",
        padding: "30px",
        margin: "20px",
        align: "center",
        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
        fontSize: "1.1em"
    }
    const styles_login = {
        padding: "20px",
        margin: "20px",
        align: "center",
        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
        fontSize: "1.4em",
        border: "2px solid black",
        boxShadow: "3px 2px",
        backgroundColor: "#CCFFDD"
    }
    const style_logo = {
        width: "125px",
        height: "125px",
        paddingTop: "10px",
        margin: "5px"
    }

    return (
        <header>
                <div className="headerup">
                    <div>
                        <ul>
                            <li><img src="./src/assets/facebook.svg"></img></li>
                            <li><img src="./src/assets/instagram.svg"></img></li>
                            <li><img src="./src/assets/twitter.svg"></img></li>
                        </ul>
                    </div>
                </div>
                <div className="headerdown">
                    <div>
                        <img style={style_logo} src="./wetteren_logo.svg"></img>
                    </div>
                    <div>
                        <nav>
                            <ul>
                                <li style={styles_nav}><a href="#">Accueil</a></li>
                                <li style={styles_nav}><a href="#">Agenda</a></li>
                                <li style={styles_nav}><a href="#">Magasin</a></li>
                                <li style={styles_nav}><a href="#">Actualités</a></li>
                                <li style={styles_nav}><a href="#">Gestionnaire</a></li>
                            </ul>
                        </nav>
                    </div>
                    {children}
                </div>
        </header>
    )
}

function Header(){
    const token = localStorage.getItem('token');

    return (
        <>
            <SignedIn>
                <HeaderBase>
                    <UserButton />
                </HeaderBase>
            </SignedIn>
            <SignedOut>
                <HeaderBase>
                    <Button variant="rfc"><Link to="/auth/register">S'inscrire</Link></Button>
                    <Button variant="secondary"><Link to="/auth/login">Se connecter</Link></Button>
                </HeaderBase>
            </SignedOut>
        </>
    )
}

export default Header



































