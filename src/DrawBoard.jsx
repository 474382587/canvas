import { useRef, useState, useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

import './DrawBoard.scss';

import initialData from './initialData';
import SaveModal from './SaveModal';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';

const DrawBoard = () => {
  const params = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const { id } = params;

    const fetchAndSetDraw = async (drawId) => {
      const res = await axios.get(
        'https://lambent-phoenix-5a89bb.netlify.app/.netlify/functions/draws/' + drawId
      );
      console.log({ res });
      if (res.data.draw) {
        console.log(res.data.draw);
        const elements = res.data.draw.elements;
        setTitle(res.data.draw.title);
        console.log(JSON.parse(elements));
        loadElements(JSON.parse(elements));
      }
    };

    fetchAndSetDraw(id);
  }, [params]);

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);

  const excalidrawRef = useRef(null);

  const loadElements = (elements) => {
    excalidrawRef.current.updateScene({
      elements,
    });
  };

  const updateScene = () => {
    const sceneData = {
      elements: [
        {
          type: 'rectangle',
          version: 141,
          versionNonce: 361174001,
          isDeleted: false,
          id: 'oDVXy8D6rom3H1-LLH2-f',
          fillStyle: 'hachure',
          strokeWidth: 1,
          strokeStyle: 'solid',
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 100.50390625,
          y: 93.67578125,
          strokeColor: '#c92a2a',
          backgroundColor: 'transparent',
          width: 186.47265625,
          height: 141.9765625,
          seed: 1968410350,
          groupIds: [],
        },
      ],
      appState: {
        viewBackgroundColor: '#edf2ff',
      },
    };
    excalidrawRef.current.updateScene(sceneData);
  };

  const [open, setOpen] = useState(false);
  const onSave = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const onUpdate = async (id) => {
    await axios.put('https://lambent-phoenix-5a89bb.netlify.app/.netlify/functions/draws/' + id, {
      data: {
        title,
        elements: excalidrawRef.current.getSceneElements(),
      },
    });
  };

  const onSubmit = async ({ title, description }) => {
    console.log(title, excalidrawRef.current.getSceneElements());

    const elements = excalidrawRef.current.getSceneElements();
    if (!elements || !elements.length) {
      console.log('nothing saved');
      return;
    }

    await axios.post('https://lambent-phoenix-5a89bb.netlify.app/.netlify/functions/draws', {
      data: {
        description,
        title,
        elements: excalidrawRef.current.getSceneElements(),
      },
    });
  };

  return (
    <div className="App">
      <SaveModal onSubmit={onSubmit} open={open} setOpen={setOpen} />
      <div style={{ paddingTop: 10 }}>
        <Button
          type="primary"
          onClick={() => {
            navigate('/');
          }}
        >
          Back
        </Button>
        {!params.id ? (
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
        ) : (
          <>
            {title} -{' '}
            <Button
              type="primary"
              onClick={() => {
                onUpdate(params.id);
              }}
            >
              Update
            </Button>
          </>
        )}
      </div>
      <div className="button-wrapper">
        <button className="update-scene" onClick={updateScene}>
          Update Scene
        </button>
        <button
          className="reset-scene"
          onClick={() => {
            excalidrawRef.current.resetScene();
          }}
        >
          Reset Scene
        </button>
        <label>
          <input
            type="checkbox"
            checked={viewModeEnabled}
            onChange={() => setViewModeEnabled(!viewModeEnabled)}
          />
          View mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={zenModeEnabled}
            onChange={() => setZenModeEnabled(!zenModeEnabled)}
          />
          Zen mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={gridModeEnabled}
            onChange={() => setGridModeEnabled(!gridModeEnabled)}
          />
          Grid mode
        </label>
      </div>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRef}
          initialData={initialData}
          onChange={(elements, state) =>
            console.log('Elements :', elements, 'State : ', state)
          }
          onPointerUpdate={(payload) => console.log(payload)}
          onCollabButtonClick={() =>
            window.alert('You clicked on collab button')
          }
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
        />
      </div>
    </div>
  );
};

export default DrawBoard;
