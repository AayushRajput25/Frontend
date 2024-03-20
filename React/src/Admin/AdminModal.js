import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

function ModalFullscreenExample({ isOpen, toggle, prevCoursesData }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" fullscreen>
      <ModalHeader toggle={toggle}>Courses</ModalHeader>
      <ModalBody>
        
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Back
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
}

export default ModalFullscreenExample;
