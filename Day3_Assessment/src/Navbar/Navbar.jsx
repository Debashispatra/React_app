import styled from "styled-components";

const NavLink = styled.a`
  text-decoration: none;
  margin: 0 10px;
  font-size: 18px;

  /* Hover effect */
  &:hover {
    color: red;
  }

  /* Hide on mobile (width < 600px) */
  @media (max-width: 600px) {
    display: none;
  }
`;
export default function Navbar(){
    return (
        <div>
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Contact</NavLink>
        </div>
    )
}