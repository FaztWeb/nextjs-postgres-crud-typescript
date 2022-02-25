import profile__styles from './profile.module.css';
const Profile = () => {
  return (
    <div className={profile__styles.container}>
      <div className={profile__styles.icon}></div>
      <div className={profile__styles.user_profile}>
        <div className={profile__styles.user_name}>
          JFSLKDJFLKJLSKDJFLJSDLKFJLKSDJFLKJDFLKJSDFLKJDSLFKJLSDJFLKSDJFLKSDJFLKJSDLKFJSDLKFJLKDSJFLKJDFLKJSDLKFJLKSDJFLKSDJFLKJSD
        </div>
        <div className={profile__styles.user_navigate}>Profilul meu</div>
      </div>
    </div>
  );
};
export default Profile;
