/*
you can get the MenuItem from the graphiql playground
just click on the docs on the right side 
and search for the query from the search bar - in this case, menuItems 
and then click on the result that appears, click until you reach 
to the children
*/
const MenuFragment = `
  fragment MenuFragment on MenuItem {
    id 
    label
    url
    path
  }
`;
export default MenuFragment;
