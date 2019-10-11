import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    toggle = () => {
        this.props.toggle()
    }
    componentDidUpdate(prevProps) {
        if (this.props.editText !== prevProps.editText) {
            this.setState({
                text: this.props.editText
            })
        }
    }
    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    editDone = () => {
        this.props.handleEditDone(this.state.text)
        this.toggle()
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                    <ModalBody>
                        <textarea rows="4" cols="50"
                            value={this.state.text}
                            onChange={this.handleInputChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.editDone}>Done</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalComponent;