export type UserProps = {
  name: string;
  username: string;
  avatar: string;
  online: boolean;
};

export type MessageProps = {
  id: string;
  content: string;
  timestamp: string;
  unread?: boolean;
  sender: UserProps | 'Вы';
  attachment?: {
    fileName: string;
    type: string;
    size: string;
  };
};

export type ChatProps = {
  id: string;
  sender: UserProps;
  messages: MessageProps[];
};
