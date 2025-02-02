import React from 'react';
import '../style/team.css';
const Profiles = () => {
  const profiles = [
    {
      name: 'Sandra',
      imgUrl: 'https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/images/profile-1-trans.png',
      bgImgUrl: 'https://picsum.photos/id/112/300/200'
    },
    {
      name: 'David V.',
      imgUrl: 'https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/images/profile-8-trans.png',
      bgImgUrl: 'https://picsum.photos/id/54/300/200'
    },
    {
      name: 'Ronald',
      imgUrl: 'https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/images/profile-3-trans.png',
      bgImgUrl: 'https://picsum.photos/id/48/300/200'
    },
    {
      name: 'Elizabeth',
      imgUrl: 'https://raw.githubusercontent.com/cbolson/icodethis-challenges/main/assets/images/profile-5-trans.png',
      bgImgUrl: 'https://picsum.photos/id/210/300/200'
    }
  ];

  return (
    <section className="profiles">
      {profiles.map((profile, index) => (
        <div className="avatar" key={index}>
          <div className="avatar-img">
            <img src={profile.imgUrl} alt={profile.name} />
          </div>
          <p>{profile.name}</p>
        </div>
      ))}
    </section>
  );
};

export default Profiles;
