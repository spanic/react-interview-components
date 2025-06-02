import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { Alert, Card, Typography } from 'antd'; // theme might not be needed if not using token directly
import { createStyles } from 'antd-style';
import useResizeObserver from 'use-resize-observer';
// Import the new function and type
import { SingleDimension } from '../utils/dimensions';

// Define props for the component using SingleDimension
export interface ResponsivePreviewDecoratorProps {
  children: ReactNode;
  displayDimensions: SingleDimension[]; // Expects dimensions with token-derived min/max
}

// Refactored useStyles to prioritize direct JS object syntax
const useStyles = createStyles(({ token }) => ({
  responsivePreviewDecorator: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    // padding: '16px', // Decided to let parent handle padding
    // backgroundColor: token.colorBgLayout, // Use theme token for background
  },
  decoratorTitle: {
    marginBottom: '16px',
  },
  card: {
    // Ant Card has its own border, but can be overridden if needed:
    // border: `1px solid ${token.colorBorderSecondary}`,
    '& .ant-card-head': { // Targeting nested Ant Design class
      backgroundColor: token.colorFillAlter, // Lighter background for card head
      padding: '12px 16px',
    },
    '& .ant-card-body': { // Targeting nested Ant Design class
      padding: '16px',
    },
  },
  alertWarningInCardBody: {
    // This class is not actively used in the JSX for styling the Alert directly,
    // as the Alert's margin is handled by an inline style when its parent CardBody has padding: 0.
    // If general styling for the Alert within the card was needed, it could be placed here.
    // For example:
    // textAlign: 'center',
  },
  dimensionLabel: {
    fontWeight: 'bold',
  },
  pixelRange: {
    fontSize: '0.85em',
    color: token.colorTextTertiary,
    marginLeft: '8px',
  },
}));


const ResponsivePreviewDecorator: React.FC<ResponsivePreviewDecoratorProps> = ({
  children,
  displayDimensions,
}) => {
  // const { token } = theme.useToken(); // Not needed
  const { styles, cx } = useStyles();

  const decoratorRef = useRef<HTMLDivElement>(null);
  // Provide a default width for initial render, useResizeObserver will update it
  const { width: observedWidth = 0 } = useResizeObserver<HTMLDivElement>({ ref: decoratorRef });

  // Simplified state for visibility only
  const [containerVisibility, setContainerVisibility] = useState<Record<string, boolean>>({});
  // cardRefs are no longer needed as we observe the main container

  useEffect(() => {
    if (!displayDimensions || displayDimensions.length === 0) {
      setContainerVisibility({}); // Clear visibility if no dimensions
      return;
    }

    const newVisibility: Record<string, boolean> = {};
    for (const dim of displayDimensions) {
      // Ensure dim.min is treated as a number, defaulting to 0 if somehow undefined
      newVisibility[dim.label] = (dim.min ?? 0) <= observedWidth;
    }
    setContainerVisibility(newVisibility);
    //eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [observedWidth, displayDimensions]); // Rerun when observedWidth or displayDimensions change

  if (!displayDimensions || displayDimensions.length === 0) {
    return (
      <Alert
        message="No dimensions specified for preview."
        type="info"
        showIcon
      />
    );
  }

  return (
    <div ref={decoratorRef} className={styles.responsivePreviewDecorator}>
      <Typography.Title level={4} className={styles.decoratorTitle}>
        Responsive Previews
      </Typography.Title>
      {displayDimensions.map(dimension => {
        // Directly use min/max from the dimension prop
        const { label, min: actualMinWidth, max: actualMaxWidth } = dimension;
        // Use the new containerVisibility state
        const isVisible = containerVisibility[label] !== false; // Default to true if not explicitly false

        return (
          // Removed the individual div wrapper and ref assignment as cardRefs are gone
          <Card
            key={label}
            className={styles.card}
              title={
                <>
                  <span className={styles.dimensionLabel}>{label} Preview</span>
                  <span className={styles.pixelRange}>
                    ({actualMinWidth}px - {actualMaxWidth === Infinity ? '∞' : actualMaxWidth + 'px'})
                  </span>
                </>
              }
              style={{
                minWidth: `${actualMinWidth}px`,
                maxWidth: actualMaxWidth === Infinity ? 'none' : `${actualMaxWidth}px`,
              }}
              bodyStyle={{ padding: isVisible ? undefined : '0' }} // Use default (16px from CSS-in-JS) or 0
            >
              {isVisible ? (
                children
              ) : (
                <Alert
                  message={`Please increase the preview width to at least ${actualMinWidth}px to see the ${label} preview.`}
                  type="warning"
                  showIcon
                  style={!isVisible ? { margin: '24px' } : {}} // Ensure margin when card body padding is 0
                />
              )}
            </Card>
        );
      })}
    </div>
  );
};

export default ResponsivePreviewDecorator;
