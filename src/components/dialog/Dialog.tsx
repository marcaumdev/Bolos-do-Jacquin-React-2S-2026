import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import './Dialog.css'

type DialogProps = {
    title?: string;
    mostrar: boolean;
    mensagem: string;
    textoConfirmar: string;
    textoCancelar: string;
    aoFechar: () => void;
    aoConfirmar: () => void;
}

function Dialog({
    title, 
    mostrar, 
    mensagem = "Esta é uma mensagem padrão", 
    textoConfirmar = "Confirmar", 
    textoCancelar = "Cancelar", 
    aoFechar, 
    aoConfirmar} : DialogProps) {

    return (
        <>
            <Modal show={mostrar} onHide={aoFechar} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title ? title : "Texto padrão"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{mensagem}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={aoFechar}>
                        {textoCancelar}
                    </Button>
                    <Button variant='primary' onClick={aoConfirmar}>
                        {textoConfirmar}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Dialog;