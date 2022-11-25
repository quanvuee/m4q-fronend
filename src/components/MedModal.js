import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hide, selectMedShow } from './medShowSlice';

export default () => {
    const show = useSelector(selectMedShow);
    const dispatch = useDispatch();
    const [title,setTitle] = useState();
    useEffect(() => {
        if (show.type === "add") {
            setTitle("Thêm bản ghi");
        } else if (show.type === "view") {
            setTitle("Chi tiết");
        } else if (show.type === "update") {
            setTitle("Chỉnh sửa");
        }
    })
    return <Modal show={show.isShow} onHide={() => dispatch(hide())}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is a demo</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(hide())}>Đóng</Button>
            <Button variant="primary" onClick={() => dispatch(hide())}>Lưu</Button>
        </Modal.Footer>
    </Modal>
}