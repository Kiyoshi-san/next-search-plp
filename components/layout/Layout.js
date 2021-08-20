import MainNavigation from './MainNavigation';
import classes from './Layout.module.scss';

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <main className={classes.container}>{props.children}</main>
        </div>
    );
}

export default Layout;