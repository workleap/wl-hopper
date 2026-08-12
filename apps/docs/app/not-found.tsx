import Link from "next/link";
import "./404.css";

export default function Custom404() {
    return (
        <main className="hd-layout__wrapper hd-layout_404">
            <article>
                <h1 className="hd-404__title">Oops!</h1>
                <h2 className="hd-404__subtitle">You hopped on the wrong side of the pond.</h2>
                <Link className="hd-404__button" href="/">
                    Back to the shore
                </Link>
            </article>
        </main>
    );
}
