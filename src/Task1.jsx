import { useState } from "react";


function Task1()
{
    let[color,SetColor]=useState("");
    function handleColor(e)
    {
        SetColor(e.target.value);
    }
    return(<>
    <section className="container-fluid mt-4">
        <div className="row">
            <div className="col-4 m-auto">
            <div className="card">
                <div className="card-body m-5 style={{background: color}}">
                    <input type="text"
                    value={color}
                    onChange={handleColor}
                    placeholder="enter color name"/>
                </div>
            </div>
            </div>
        </div>

    </section>
    </>)
}
export default Task1;