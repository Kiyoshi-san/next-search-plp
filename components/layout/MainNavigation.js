import { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import classes from './MainNavigation.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    userSession,
    listProducts,
    listCategories,
    showMenu,
} from "../../redux/actions";

function MainNavigation() {
    const dispatch = useDispatch();
    const [showMobile, setShowMobile] = useState("");
    const [showMenuMobile, setShowMenuMobile] = useState(true);
    
    const searchInputRef = useRef();
    const searchMobileButtonRef = useRef();
    
    const userSessionReg = useSelector(state => state.userSession);
    const router = useRouter();
    
    useEffect( async () => {
        const data = await fetch('/api/categories');
        const res = await data.json();
        dispatch(listCategories(res));
    }, [])
    
    useEffect(() => {
        let localUserData = localStorage.getItem("userData");
        if(!localUserData) {
            router.push("/login");
        }
      
        dispatch(userSession(JSON.parse(localUserData)));
    }, []);

    const handleSearch = (e) => {
        e?.preventDefault();
        let search = searchInputRef.current.value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        dispatch(listProducts({ search }));
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSearch();
        }
    }

    const showSearchMobile = () => {
        searchMobileButtonRef.current.classList.add("hidden");
        setShowMobile(classes.showMobile);
    }

    const handleMenuMobileShow = () => {
        dispatch(showMenu(showMenuMobile));
        setShowMenuMobile(!showMenuMobile);
    }

    const handleLogout = () => {
        localStorage.setItem("userData", "{}");
        dispatch(userSession({}));
        router.push("/login");
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <div
                    className={`${classes.mobileMenu} show-for-small-only`}
                    onClick={handleMenuMobileShow}
                >
                    <i className="fa fa-bars"></i>
                </div>
                <Link href="/">
                    <img src="/meli_logo.png" alt="Meli Logo" />
                </Link>
            </div>
            {userSessionReg && userSessionReg.name && (
                <>
                    <div className={`${classes.searchbarContainer} ${showMobile}`}>
                        <div className={classes.inputBox}>
                            <input
                                type="text"
                                ref={searchInputRef}
                                placeholder="Search"
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className={classes.searchBtn}>
                            <button type="submit" onClick={handleSearch}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${classes.searchMobile} show-for-small-only`}
                        onClick={showSearchMobile}
                        ref={searchMobileButtonRef}
                    >
                        <i className="fa fa-search"></i>
                    </div>
                </>
            )}
            <nav>
                <ul>
                    <li>
                        {userSessionReg && userSessionReg.name ? (
                            <div className={classes.nameContainer}>
                                <span className="hide-for-small">
                                    {`Olá ${userSessionReg?.name}` || "Bem vindo!"}
                                </span>
                                <div
                                    className={classes.logoutContainer}
                                    onClick={handleLogout}
                                >
                                    <span className={classes.logoutBox}>Log out</span>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login">Login</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
