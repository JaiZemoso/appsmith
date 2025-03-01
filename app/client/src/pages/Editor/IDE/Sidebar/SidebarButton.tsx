import React from "react";
import { Icon, Text, Tooltip } from "design-system";
import styled from "styled-components";
import { SidebarTopButtonTitles } from "@appsmith/entities/IDE/constants";

export interface SidebarButtonProps {
  title?: string;
  selected: boolean;
  icon: string;
  onClick: () => void;
  tooltip?: string;
  conditionIcon?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  text-align: center;
  align-items: center;
  padding: 8px 0;
`;

const IconContainer = styled.div<{ selected: boolean }>`
  padding: 2px;
  background-color: ${(props) =>
    props.selected ? "var(--colors-raw-orange-100, #fbe6dc)" : "white"};
  border-radius: 3px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  &:hover {
    background: ${(props) =>
      props.selected
        ? "var(--colors-raw-orange-100, #fbe6dc)"
        : "var(--ads-v2-color-bg-subtle, #f1f5f9);"};
  }
`;

const ConditionIcon = styled(Icon)`
  position: absolute;
  bottom: 3px;
  right: -1px;
  &.t--sidebar-${SidebarTopButtonTitles.DATA}-condition-icon {
    color: #ffe283;
  }
`;

function SidebarButton(props: SidebarButtonProps) {
  return (
    <Container>
      {props.title === SidebarTopButtonTitles.DATA}
      <Tooltip
        content={props.tooltip}
        isDisabled={!!props.title && !props.tooltip}
        placement={"right"}
      >
        <IconContainer
          className={`t--sidebar-${props.title || props.tooltip}`}
          data-selected={props.selected}
          onClick={props.onClick}
          selected={props.selected}
        >
          <Icon name={props.icon} size="lg" />
          {props.conditionIcon && (
            <ConditionIcon
              className={`t--sidebar-${props.title}-condition-icon`}
              name={props.conditionIcon}
              size="md"
            />
          )}
        </IconContainer>
      </Tooltip>
      {props.title ? <Text kind="body-s">{props.title}</Text> : null}
    </Container>
  );
}

export default SidebarButton;
