import { Button } from "components/Button";
import { Icon } from "components/Icon";

import * as S from "./styles";
import * as T from "./types";

function ConfirmationModal({
  show,
  onClose,
  onConfirm,
}: T.ConfirmationModalProps) {

  function handleConfirm () {
    onConfirm();
    onClose();
  }
  
  {
    return (
      <S.Modal show={show} onHide={onClose} centered>
        <S.ModalHeader closeButton />
        <S.ModalBody>
          <Icon name="alert" />
          <p>Are you sure you want to delete this card?</p>
        </S.ModalBody>
        <S.ModalFooter>
          <Button variant="danger" onClick={handleConfirm}>
            {"Yes, I'm sure"} 
          </Button>
          <Button variant="outline-secondary" onClick={onClose}>
            No, cancel
          </Button>
        </S.ModalFooter>
      </S.Modal>
    );
  }
}

export default ConfirmationModal;
