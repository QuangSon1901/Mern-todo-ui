import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { PostContext } from '../../contexts/PostContext';

function UpdatePostModal() {
    // Context
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
    } = useContext(PostContext);
    // State
    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => {
        setUpdatedPost(post);
    }, [post]);

    const { title, description, url, status } = updatedPost;

    const onChangeUpdatedPostForm = (e) => setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });

    const closeDialog = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await updatePost(updatedPost);
        closeDialog();
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    };
    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="my-3">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeUpdatedPostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                            placeholder="Description"
                            rows={3}
                            name="description"
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control
                            type="text"
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                            placeholder="Youtube Tutorial URL"
                            name="url"
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control as="select" value={status} onChange={onChangeUpdatedPostForm} name="status">
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        LearnIt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdatePostModal;
