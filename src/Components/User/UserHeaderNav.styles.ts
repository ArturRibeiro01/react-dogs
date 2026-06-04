import styled from '@emotion/styled';

type AccountNavProps = {
  $mobile: boolean;
  $isOpen: boolean;
};

type MobileMenuButtonProps = {
  $isOpen: boolean;
};

const iconButtonStyles = `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border: 1px solid transparent;
  cursor: pointer;
`;

export const MobileMenuButton = styled.button<MobileMenuButtonProps>`
  ${iconButtonStyles}
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.surface : theme.colors.border)};
  color: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.primary : theme.colors.text)};
  box-shadow: ${({ $isOpen, theme }) => ($isOpen ? theme.shadows.focus : 'none')};
  border-color: ${({ $isOpen, theme }) => ($isOpen ? theme.colors.primary : 'transparent')};
  transition: ${({ theme }) => theme.transitions.base};

  &::after {
    content: '';
    display: block;
    width: ${({ $isOpen }) => ($isOpen ? '4px' : '1.2rem')};
    height: ${({ $isOpen }) => ($isOpen ? '4px' : '2px')};
    border-radius: 2px;
    background: currentColor;
    box-shadow: ${({ $isOpen }) =>
      $isOpen
        ? '0 8px currentColor, 0 -8px currentColor'
        : '0 6px currentColor, 0 -6px currentColor'};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'none')};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  &:focus,
  &:hover {
    outline: none;
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadows.focus};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AccountNav = styled.nav<AccountNavProps>`
  ${({ $mobile, $isOpen, theme }) =>
    $mobile
      ? `
        display: block;
        position: absolute;
        top: 70px;
        right: 0;
        padding: 0 ${theme.spacing.lg};
        background: ${theme.colors.surface};
        box-shadow: ${theme.shadows.popover};
        border-radius: ${theme.radii.sm};
        transform: ${$isOpen ? 'initial' : 'translateX(-10px)'};
        opacity: ${$isOpen ? 1 : 0};
        visibility: ${$isOpen ? 'visible' : 'hidden'};
        z-index: ${$isOpen ? theme.zIndices.header : 'auto'};
        pointer-events: ${$isOpen ? 'initial' : 'none'};
        transition: ${$isOpen ? theme.transitions.medium : 'none'};
      `
      : `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: ${theme.spacing.lg};
        border: none;
      `}

  a,
  button {
    color: ${({ theme }) => theme.colors.text};
  }

  ${({ $mobile, theme }) =>
    $mobile
      ? `
        a,
        button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: ${theme.spacing.sm} 0;
          border: none;
          border-bottom: 1px solid ${theme.colors.border};
          background: none;
          cursor: pointer;
        }

        button {
          border-bottom: none;
        }

        img {
          margin-right: ${theme.spacing.sm};
        }

        a:focus,
        button:focus {
          outline: none;
          box-shadow: ${theme.shadows.focus};
        }

      `
      : `
        a,
        button {
          ${iconButtonStyles}
          border-radius: ${theme.radii.sm};
          background: ${theme.colors.border};
          transition: ${theme.transitions.base};
        }

        a:hover,
        a:focus,
        button:hover,
        button:focus {
          background: ${theme.colors.surface};
          box-shadow: ${theme.shadows.ringNeutral};
          border-color: ${theme.colors.text};
          outline: none;
        }

        a.active {
          background: ${theme.colors.surface};
          box-shadow: ${theme.shadows.focus};
          border-color: ${theme.colors.primary};
        }

      `}
`;

export const NavIcon = styled.img`
  display: inline-block;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
`;
