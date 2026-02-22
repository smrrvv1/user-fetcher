import { IUser } from "../types";
import styles from "./styles.module.css"

interface IUserCardProps {
  user: IUser;
  onSelect: (id: number) => void;
}

const UserCard = ({ user, onSelect }: IUserCardProps) => {
  return (
    <div className={styles.card} onClick={() => onSelect(user.id)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>"компания" {user.company.name}</p>
    </div>
  )
};

export default UserCard;