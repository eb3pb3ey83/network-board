import React, { Suspense, useEffect } from 'react';
import { propOr, __ } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { FrameContentBox } from '@/model/dashboard.model';
import { selectIsMeasureDataUpdated } from '@/state/slices/layoutSlice';
import { componentsMapping } from './componentsMapping';
import { Dispatcher, dispatcherMapping } from './dispatchMapping';
import { propsMapping } from './propsMapping';

export interface ObjectData {
  [index: string]: any;
}
interface Props {
  content: FrameContentBox;
  colSpan?: number;
  openNum?: number;
  showNum?: number;
}

const getComponent = propOr(null, __, componentsMapping);
const getDispatcher = propOr(null, __, dispatcherMapping);
const getPropsMapper = propOr(() => ({}), __, propsMapping);

const DynamicComponent = ({ content, colSpan, openNum, showNum }: Props) => {
  const ComponentToRender = getComponent<React.LazyExoticComponent<any>>(content.type);
  const isColUpdated = useSelector(selectIsMeasureDataUpdated);
  const mapProps = getPropsMapper<(content: FrameContentBox, openNum?: number, showNum?: number) => ObjectData>(content.type);
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatcher = getDispatcher<(dispatcher: Dispatcher) => void>(content.type);
    if (!dispatcher || isColUpdated) return;
    dispatcher({ dispatch, content });
  }, [content]);

  if (!ComponentToRender) {
    return <div style={{ fontSize: '16px', padding: '16px' }}>Error: Component not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentToRender colSpan={colSpan} {...mapProps(content, openNum, showNum)} />
    </Suspense>
  );
};

export default DynamicComponent;
