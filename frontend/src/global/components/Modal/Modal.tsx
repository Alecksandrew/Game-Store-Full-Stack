import { Body } from "./components/Body";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Root } from "./components/Root";
import { ConfirmationModal, NotificationModal } from "./Modal.presets";

export const Modal = {
  Root: Root,
  Content: Content,
  Header: Header,
  Body: Body,
  Footer: Footer,
  Preset:{
    Confirmation:ConfirmationModal,
    Notification:NotificationModal
  }
};