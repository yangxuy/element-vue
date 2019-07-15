type MessageType = 'success' | 'info' | 'warning' | 'error' | string

interface MessageOptions {
  type: MessageType;
  message: string;
  duration: number;
  visible: boolean;

  [propName: string]: any
}