import React from "react";
import styles from '../GameContainer/GameContainer.module.css'

export function NavBar() {

    return(
        <div className={styles.navContainer}>
            <nav>
                <ul>
                    <li><a href="/">Quiz</a></li>
                    <li><a href="/questionManager">Question Manager</a></li>
                </ul>
            </nav>
        </div>
    );
}