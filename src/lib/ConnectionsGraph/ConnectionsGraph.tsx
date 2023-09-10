import cytoscape, {Core, Css} from 'cytoscape';
import React, {
  useEffect,
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
} from 'react';
import {styled} from 'styled-components';

export interface IConnectionsGraphProps {
  source: Array<{
    data: {
      id: string;
      source?: string;
      target?: string;
      color?: string;
      name?: string;
    };
  }>;
  onGraphInit?: (core: Core) => void;
}

export const ConnectionsGraph = forwardRef<
  Core | undefined,
  IConnectionsGraphProps
>(({source, onGraphInit}: IConnectionsGraphProps, ref) => {
  const cytoscapeContainerRef = useRef<HTMLDivElement>(null);

  const [graphInstance, setGraphInstance] = useState<Core>();

  useEffect(() => {
    graphInstance && onGraphInit?.(graphInstance);
  }, [graphInstance, onGraphInit]);

  useImperativeHandle(ref, () => graphInstance, [graphInstance]);

  useEffect(() => {
    const cy = cytoscape({
      container: cytoscapeContainerRef.current,
      elements: source,
      layout: {
        name: 'null',
      },
      minZoom: 0.5,
      maxZoom: 1.5,
      style: [
        {
          selector: 'core',
          style: {
            'active-bg-opacity': 0,
          } as Css.Core,
        },
        {
          selector: 'node, edge',
          style: {
            'overlay-opacity': 0,
          },
        },
        {
          selector: 'node',
          style: {
            label: 'data(id)',
            'text-wrap': 'wrap',
            'text-max-width': '200',
          },
        },
        {
          selector: 'edge',
          style: {
            'text-margin-y': -10,
            // @ts-ignore
            'edge-text-rotation': 'autorotate',
            'curve-style': 'bezier',
            'loop-direction': '180deg',
            'loop-sweep': '90deg',
            'control-point-step-size': 60,
          },
        },
        {
          selector: 'edge[color]',
          style: {
            'line-color': 'data(color)',
          },
        },
        {
          selector: 'edge[name]',
          style: {
            label: 'data(name)',
          },
        },
      ],
      boxSelectionEnabled: false,
      autounselectify: true,
    });
    cy.ready(({cy: instance}) => {
      setGraphInstance(instance);
    });
  }, []);

  return <Container ref={cytoscapeContainerRef} />;
});

ConnectionsGraph.defaultProps = {
  onGraphInit: undefined,
};

const Container = styled.div`
  height: 100%;
`;
