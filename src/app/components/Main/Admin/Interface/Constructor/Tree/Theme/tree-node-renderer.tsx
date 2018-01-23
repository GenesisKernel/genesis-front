import React, { Children, cloneElement } from 'react';
// import PropTypes from 'prop-types';
// import styles from './tree-node-renderer.scss';
import * as classnames from 'classnames';

interface IFileThemeTreeNodeRendererProps {
  children: any;
  listIndex: any;
  swapFrom: any;
  swapLength: any;
  swapDepth: any;
  scaffoldBlockPxWidth: any;
  lowerSiblingCounts: any;
  connectDropTarget: any;
  isOver: any;
  draggedNode: any;
  canDrop: any;
  treeIndex: any;
  treeId: any;
  getPrevRow: any;
  node: any;
  path: any;
}

class FileThemeTreeNodeRenderer extends React.Component<IFileThemeTreeNodeRendererProps> {
  render() {
    const {
      children,
      listIndex,
      swapFrom = null,
      swapLength = null,
      swapDepth = null,
      scaffoldBlockPxWidth,
      lowerSiblingCounts,
      connectDropTarget,
      isOver,
      draggedNode = null,
      canDrop = false,
      treeIndex,
      treeId, // Delete from otherProps
      getPrevRow, // Delete from otherProps
      node, // Delete from otherProps
      path, // Delete from otherProps
      ...otherProps
    } = this.props;

    const classes = classnames({
      'tree-node': true,
      'selected': node.selected
    });

    return connectDropTarget(
      <div {...otherProps} className={classes}>
        {Children.map(children, (child: any) =>
          cloneElement(child, {
            isOver,
            canDrop,
            draggedNode,
            lowerSiblingCounts,
            listIndex,
            swapFrom,
            swapLength,
            swapDepth,
          })
        )}
      </div>
    );
  }
}

// FileThemeTreeNodeRenderer.defaultProps = {
//   swapFrom: null,
//   swapDepth: null,
//   swapLength: null,
//   canDrop: false,
//   draggedNode: null,
// };

// FileThemeTreeNodeRenderer.propTypes = {
//   treeIndex: PropTypes.number.isRequired,
//   treeId: PropTypes.string.isRequired,
//   swapFrom: PropTypes.number,
//   swapDepth: PropTypes.number,
//   swapLength: PropTypes.number,
//   scaffoldBlockPxWidth: PropTypes.number.isRequired,
//   lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
//
//   listIndex: PropTypes.number.isRequired,
//   children: PropTypes.node.isRequired,
//
//   // Drop target
//   connectDropTarget: PropTypes.func.isRequired,
//   isOver: PropTypes.bool.isRequired,
//   canDrop: PropTypes.bool,
//   draggedNode: PropTypes.shape({}),
//
//   // used in dndManager
//   getPrevRow: PropTypes.func.isRequired,
//   node: PropTypes.shape({}).isRequired,
//   path: PropTypes.arrayOf(
//     PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//   ).isRequired,
// };

export default FileThemeTreeNodeRenderer;
