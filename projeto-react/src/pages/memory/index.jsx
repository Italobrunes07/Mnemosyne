import { useEffect, useState } from "react";
import Header from "../../components/header";
import "./memory.css";
import memory from "../../services/memory";
import trash from "../../assets/icons/trash-solid.svg"



const Memory = () => {
    const [memoryItem, setMemoryItem] = useState();

 useEffect(() => {

        const parametros = window.location.search;
        const urlsearch = new URLSearchParams(parametros);

        const memoryId = urlsearch.get("id");

        getMemory(memoryId);

    }, []);
    const getMemory = async (id) => {

        let response = await memory.getMemoryById(id);
        setMemoryItem(response);

    }

    const onDeleteMemory = async () => {

        let confirm = window.confirm("Deseja realmente deletar esta memoria?");

        if (confirm == false) return;

        let response = await memory.deleteMemory(MemoryItem.id);

        if (response) {
            alert("Memoria deletada com sucesso.");
            window.location.href = "/home";
        }
    }

    return (
        <>

            <Header></Header>

            <main className="app-main">
                <h1>{memoryItem?.title}</h1>
                <div className="buttons-container">

                </div>

                <div className="buttons-container">
                    <button onClick={onDeleteMemory}>
                        <img src={trash} alt="Delete memory." />
                    </button>
                </div>

                <div className="memory-item">
                    <div className="images-container">
                        {memoryItem?.images.map((image, index) => (
                            <img key={index} src={image} alt="image." />
                       ) )}
                    </div>

                    <p>{memoryItem?.description}</p>
                </div>
            </main>

            <footer className="app-footer">
                <p>Mnemosyne - Ariel Paixão dos Santos</p>
            </footer>
        </>
    );
}

export default Memory;