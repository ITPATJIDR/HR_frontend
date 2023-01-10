import React,{FunctionComponent} from "react";
import { ModalPage } from "../Types";
import { Modal, Text } from "@nextui-org/react";


const ModalMain: FunctionComponent<ModalPage> = ({ body, footer, trigger, handleClose, nameFirst, nameLast,width }) => {
  return (
    <div>
      <Modal
        closeButton
        blur 
        open={trigger}
        onClose={handleClose}
        width={width}
      >
        <Modal.Header>
          <Text size={18}>
            {nameFirst}
            &nbsp;
            <Text b size={18}>
              {nameLast}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
            {body}
        </Modal.Body>
        <Modal.Footer>
            {footer}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalMain