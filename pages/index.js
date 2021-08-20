import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import MessageBox from "../components/MessageBox/MessageBox";
import LoadingBox from "../components/Loading/LoadingBox";
import Product from '../components/Product/Product';
import classes from './index.module.scss';
import { listProducts, showMenu } from "../redux/actions";

function HomePage(props) {
    const { meliItems } = props;

    const dispatch = useDispatch();
    
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const showMenuReg = useSelector(state => state.showMenu)

    const categoryList = useSelector(state => state.categoryList)

    const userSession = useSelector(state => state.userSession);

    const router = useRouter();

    const handleCategory = catVal => {
        let search = `category=${catVal}`;
        dispatch(listProducts({ search }));
        dispatch(showMenu(false));
    }

    useEffect(() => {
        let localUserData = localStorage.getItem("userData");
        if (!localUserData) {
            router.push("/login");
        }
    }, []);

    return (
        <>
            <Head>
                <title>MeliItemstems</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active MeliItemstems!"
                />
            </Head>

            {loading ? (
                <div className={classes.productListPage}>
                    <div
                        className={`${classes.categoryMenu} ${
                            showMenuReg ? classes.showMenu : ""
                        }`}
                    >
                        {categoryList &&
                categoryList.categories?.map((cat) => (
                    <div key={cat.id} className={classes.categoryItem}>
                        <div
                            onClick={() =>
                                handleCategory(
                                    JSON.stringify(
                                        cat.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                    )
                                )
                            }
                        >
                            <span>{cat.name}</span>
                        </div>
                    </div>
                ))}
                    </div>
                    <LoadingBox></LoadingBox>
                </div>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : products?.length ? (
                <div className={classes.productListPage}>
                    <div
                        className={`${classes.categoryMenu} ${
                            showMenuReg ? classes.showMenu : ""
                        }`}
                    >
                        {categoryList &&
                categoryList.categories?.map((cat) => (
                    <div key={cat.id} className={classes.categoryItem}>
                        <div
                            onClick={() =>
                                handleCategory(
                                    JSON.stringify(
                                        cat.name
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                    )
                                )
                            }
                        >
                            <span>{cat.name}</span>
                        </div>
                    </div>
                ))}
                    </div>
                    <div className={classes.gridContainer}>
                        <h1>Products</h1>
                        {products.map((item) => (
                            <>
                                <Product
                                    key={item.id}
                                    product={item}
                                    wished={!!userSession.wishedProducts?.includes(item.id)}
                                />
                            </>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={classes.productListPage}>
                    <div
                        className={`${classes.categoryMenu} ${
                            showMenuReg ? classes.showMenu : ""
                        }`}
                    >
                        {categoryList &&
                categoryList.categories?.map((cat) => (
                    <div key={cat.id} className={classes.categoryItem}>
                        <div
                            onClick={() =>
                                handleCategory(
                                    JSON.stringify(
                                        cat.name
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                    )
                                )
                            }
                        >
                            <span>{cat.name}</span>
                        </div>
                    </div>
                ))}
                    </div>
                    <div className={classes.noProductContainer}>
                        <h1>No products, please make a new Search :)</h1>
                    </div>
                </div>
            )}
        </>
    );
}

export async function getServerSideProps() {
    try {
        const apiUrl = process.env.API_URL;

        const res = await fetch(`${apiUrl}search?category=Animais`);
        let data = await res.json();

        return {
            props: {
                meliItems: data,
            },
        };
    } catch (error) {
        console.log(error);
    }
}

export default HomePage;
