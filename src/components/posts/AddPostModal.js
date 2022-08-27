import { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { PostContext } from '../../contexts/PostContext';

function AddPostModal() {
    // Context
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;

    const onChangeNewPostForm = (e) => setNewPost({ ...newPost, [e.target.name]: e.target.value });

    const closeDialog = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setShowAddPostModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await addPost(newPost);
        closeDialog();
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    };
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
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
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={onChangeNewPostForm}
                            placeholder="Description"
                            rows={3}
                            name="description"
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control
                            type="text"
                            value={url}
                            onChange={onChangeNewPostForm}
                            placeholder="Youtube Tutorial URL"
                            name="url"
                        />
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

export default AddPostModal;
