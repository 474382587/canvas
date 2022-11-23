import { Avatar, Button, Col, List, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [draws, setDraws] = useState([]);
  useEffect(() => {
    const getAllDraws = async () => {
      const res = await axios.get(
        'https://lambent-phoenix-5a89bb.netlify.app/.netlify/functions/draws'
      );
      console.log('---', res);
      const data = res.data?.draws;

      if (data) setDraws(data);
    };

    getAllDraws();
  }, []);

  return (
    <Row style={{ width: '100%', marginTop: 30 }}>
      <Col span={2}></Col>
      <Col span={20}>
        <List
          itemLayout="horizontal"
          dataSource={draws}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<Link to={`/draw/${item.id}`}>{item.title}</Link>}
                description={item.description || '...'}
              />
            </List.Item>
          )}
        />
      </Col>
      <Col span={2}>
        <Link to="/draw">
          <Button type="primary">New</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Home;
