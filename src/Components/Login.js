import { useState } from "react";

export default function Login(){
    return(
        <div>
            <form>
                <input type="email" name="email" id="email"/>
                <input type="password" name="pass" id="pass"/>
            </form>
        </div>
    );
}