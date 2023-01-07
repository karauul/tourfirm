import './NavBar.css';
import { HashLink } from 'react-router-hash-link';

interface INavBarItem {
  title: string;
  link: string;
}

interface IProps {
  items: INavBarItem[];
}

const NavBar: React.FC<IProps> = (props: IProps) => {
  const scrollToElement = (el: HTMLElement) => {
    const headerOffset = window.innerHeight * 0.1;
    const rootNode = document.getElementById('root'[0]);
    const elementPositionFromTop = el.offsetTop - headerOffset;
    window.scrollTo({
      top: elementPositionFromTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="nav-bar">
      {props.items.map((item) => (
        <div key={item.title} className="nav">
          <HashLink to={item.link} scroll={scrollToElement}>
            {item.title}
          </HashLink>
        </div>
      ))}
    </div>
  );
};
export default NavBar;
