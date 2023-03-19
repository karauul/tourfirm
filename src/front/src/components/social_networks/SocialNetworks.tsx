import Icon from '@ant-design/icons/lib/components/Icon';
import { Button } from 'antd';
import { openURL } from 'utils/openURL';
import './SocialNetworks.css';

interface ISocialNetork {
  icon: string;
  src: string;
}

interface iProps {
  items: ISocialNetork[];
}

const SocialNetworks: React.FC<iProps> = (props: iProps) => {
  return (
    <div className="social-networks">
      {props.items.map(item => (
        <div key={item.icon}>
          <Button
            type="ghost"
            className="social-network"
            shape="circle"
            onClick={() => {
              openURL(item.src, true);
            }}
            icon={
              <Icon
                component={() => (
                  <img className="social-network-image" src={item.icon} />
                )}
              />
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SocialNetworks;
