import { useCurrentApp } from "components/context/app.context";
import './app.header.scss'
import logo from 'assets/react.svg'
import { CiShoppingCart } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Button, Dropdown, Input, MenuProps } from 'antd';
import { Avatar, Badge, Space } from 'antd';
import { Link } from "react-router-dom";
import { logoutAPI } from "services/api";
import { useNavigate } from "react-router";


const AppHeader = () => {
  const navigate = useNavigate();

  const { user, setUser, isAuthenticated, setIsAuthenticated } = useCurrentApp();

  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false)
      localStorage.removeItem("access_token")
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'Quản lý tài khoản ',
      key: '1',
    },
    {
      label: 'Lịch sử mua hàng ',
      key: '2',
    }, {
      label: <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
        Đăng xuất
      </label>,
      key: 'logout',
    },
  ];

  if (user?.role === 'ADMIN') {
    items.unshift({
      label: <Link to="/admin">Trang quản trị </Link>,
      key: 'admin',
    })
  }


  return (

    <header>



      <header className="header">
        <div className="header__logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>

          <img src={logo} />
          <span>Tran Phu</span>

        </div>
        <div className="header__search">
          <Input size="large" placeholder="Hôm nay bạn kiếm gì" prefix={<IoIosSearch style={{ color: "#007bff", fontSize: "18px" }} />} />
        </div>


        <Badge count={10} size="small">
          <CiShoppingCart style={{ fontSize: "27px", color: "#007bff" }} />
        </Badge>

        <div className="header__info">
          {isAuthenticated ? <FaUserAlt style={{ fontSize: "20px", marginRight: "10px", }} /> : " "}

          {isAuthenticated ?
            <Dropdown menu={{ items }} trigger={['click']} placement="bottom">
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ color: "rgb(151 151 151)" }}>
                  Welcom Admin
                </Space>
              </a>
            </Dropdown> : <div > <Link to="/login" style={{ color: "#000" }}>Tài khoản</Link> </div>
          }
        </div>
      </header>
    </header>
  );
}
export default AppHeader;