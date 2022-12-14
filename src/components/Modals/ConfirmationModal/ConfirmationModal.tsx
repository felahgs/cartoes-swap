import { Button } from "components/Button";
import { Icon } from "components/Icon";

import * as S from "./styles";
import * as T from "./types";

function ConfirmationModal({
  message,
  show,
  onClose,
  onConfirm,
}: T.ConfirmationModalProps) {
  function handleConfirm() {
    onConfirm();
  }

  {
    return (
      <S.Modal show={show} onHide={onClose} centered>
        <S.ModalHeader closeButton />
        <S.ModalBody>
          <Icon name="alert" />
          <p>{message}</p>
        </S.ModalBody>
        <S.ModalFooter>
          <Button name="confirm" variant="danger" onClick={handleConfirm}>
            {"Yes, I'm sure"}
          </Button>
          <Button name="cancel" variant="outline-secondary" onClick={onClose}>
            No, cancel
          </Button>
        </S.ModalFooter>
      </S.Modal>
    );
  }
}

export default ConfirmationModal;
