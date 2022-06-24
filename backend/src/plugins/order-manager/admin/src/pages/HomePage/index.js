import React, { memo } from "react";
import pluginId from "../../pluginId";
import { Typography } from "@strapi/design-system/Typography";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { useState, useEffect } from "react";
import { Box } from "@strapi/design-system/Box";
import Layout, {
  BaseHeaderLayout,
  HeaderLayout,
} from "@strapi/design-system/Layout";
import { getOrders, getProducts } from "../../utils/api";
import { Flex } from "@strapi/design-system/Flex";
import { Link } from "@strapi/design-system/Link";
import ArrowLeft from "@strapi/icons/ArrowLeft";
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
  SubNavLinkSection,
} from "@strapi/design-system/SubNav";
const links = [
  {
    id: 1,
    label: "Addresses",
    icon: <ExclamationMarkCircle />,
    to: "/address",
  },
  {
    id: 2,
    label: "Categories",
    to: "/category",
  },
  {
    id: 3,
    label: "Cities",
    icon: <Apps />,
    to: "/city",
    active: true,
  },
  {
    id: 4,
    label: "Countries",
    to: "/country",
  },
];
const ROW_COUNT = 6;
const COL_COUNT = 10;
const entry = {
  cover: "https://avatars.githubusercontent.com/u/3874873?v=4",
  description: "Chez Léon is a human sized Parisian",
  category: "French cuisine",
  contact: "Leon Lafrite",
};
const entries = [];

for (let i = 0; i < 5; i++) {
  entries.push({ ...entry, id: i });
}

// const HomePage = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [openOrder, setOpenOrder] = useState(null);

//   useEffect(() => {
//     getOrders().then((data) => {
//       setData(data);
//       setLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     console.log(data);
//     const selectedOrder = data.find((order) => order.orderId == openOrder);
//     if (!selectedOrder) return;
//     const orderIds = Object.keys(selectedOrder.items).map((elem) =>
//       parseInt(elem)
//     );
//     getProducts(orderIds).then((data) => {
//       console.log(data);
//     });
//   }, [openOrder]);

//   if (loading) return <LoadingIndicatorPage />;
//   return (
//     <div>
//       <Box background="neutral100">
//         {openOrder ? (
//           <BaseHeaderLayout
//             title="Order"
//             subtitle={`Order ID: ${openOrder}`}
//             navigationAction={
//               <Link
//                 startIcon={<ArrowLeft />}
//                 onClick={() => {
//                   setOpenOrder(null);
//                 }}
//                 style={{ cursor: "pointer" }}
//               >
//                 Back
//               </Link>
//             }
//             as="h2"
//           />
//         ) : (
//           <>
//             <BaseHeaderLayout
//               title="Order Manager"
//               subtitle="Manage the placed orders here"
//               navigationAction={
//                 <Link
//                   startIcon={<ArrowLeft />}
//                   disabled
//                   style={{ cursor: "pointer" }}
//                 >
//                   Back
//                 </Link>
//               }
//               as="h2"
//             />
//             <Box padding={8}>
//               <Table
//                 colCount={7}
//                 rowCount={data.length}
//                 onClick={(e) => {
//                   // console.log(e.target.closest("tr").dataset.orderindex);
//                   setOpenOrder(
//                     e.target.closest("tr").dataset.orderindex || null
//                   );
//                 }}
//               >
//                 <Thead>
//                   <Tr>
//                     <Th>
//                       <Typography variant="sigma">ID</Typography>
//                     </Th>
//                     <Th>
//                       <Typography variant="sigma">Name</Typography>
//                     </Th>
//                     <Th>
//                       <Flex justifyContent="right" alignItems="right">
//                         <Typography variant="sigma">Payment Status</Typography>
//                       </Flex>
//                     </Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {data.map((order) => (
//                     <Tr
//                       key={order.orderId}
//                       style={{ cursor: "pointer" }}
//                       data-orderindex={order.orderId}
//                     >
//                       <Td>
//                         <Typography textColor="neutral800">
//                           {order.orderId}
//                         </Typography>
//                       </Td>
//                       <Td>
//                         <Typography textColor="neutral800">
//                           {order.transactionId}
//                         </Typography>
//                       </Td>
//                       <Td>
//                         <Typography textColor="neutral800">
//                           {order.isConfirmed ? "Completed" : "Incomplete"}
//                         </Typography>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Box>
//           </>
//         )}

//         {/* <pre>{JSON.stringify(data)}</pre> */}
//       </Box>
//     </div>
//   );
// };

const HomePage = () => {
  return (
    <Box background="neutral100">
      <Layout
        sideNav={
          <SubNav ariaLabel="Builder sub nav">
            <SubNavHeader
              searchable
              value={""}
              onClear={() => {}}
              onChange={(e) => {}}
              label="Builder"
              searchLabel="Search..."
            />
            <SubNavSections>
              <SubNavSection
                label="Collection Type"
                collapsable
                badgeLabel={links.length.toString()}
              >
                {links.map((link) => (
                  <SubNavLink to={link.to} active={link.active} key={link.id}>
                    {link.label}
                  </SubNavLink>
                ))}
              </SubNavSection>
              <SubNavSection
                label="Single Type"
                collapsable
                badgeLabel={links.length.toString()}
              >
                <SubNavLinkSection label="Default">
                  {links.map((link) => (
                    <SubNavLink to={link.to} key={link.id}>
                      {link.label}
                    </SubNavLink>
                  ))}
                </SubNavLinkSection>
              </SubNavSection>
            </SubNavSections>
          </SubNav>
        }
      >
        <>
          <HeaderLayout
            primaryAction={<Button startIcon={<Plus />}>Add an entry</Button>}
            secondaryAction={
              <Button variant="tertiary" startIcon={<Pencil />}>
                Edit
              </Button>
            }
            title="Other CT"
            subtitle="36 entries found"
            as="h2"
          />
          <ActionLayout
            startActions={
              <>
                {Array(20)
                  .fill(null)
                  .map((_, index) => (
                    <Box paddingTop={2}>
                      <Tag key={index} icon={<Plus aria-hidden={true} />}>
                        Hello world {index}
                      </Tag>
                    </Box>
                  ))}
              </>
            }
            endActions={
              <>
                <Button size="M" variant="tertiary">
                  Settings
                </Button>
                <Button size="M" variant="tertiary">
                  Settings
                </Button>
              </>
            }
          />
          <ContentLayout>
            <Table
              colCount={COL_COUNT}
              rowCount={ROW_COUNT}
              footer={
                <TFooter icon={<Plus />}>
                  Add another field to this collection type
                </TFooter>
              }
            >
              <Thead>
                <Tr>
                  <Th>
                    <BaseCheckbox aria-label="Select all entries" />
                  </Th>
                  <Th>
                    <Typography variant="sigma">ID</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Cover</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Description</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Categories</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Contact</Typography>
                  </Th>
                  <Th>More</Th>
                  <Th>More</Th>
                  <Th>More</Th>
                  <Th>
                    <VisuallyHidden>Actions</VisuallyHidden>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {entries.map((entry) => (
                  <Tr key={entry.id}>
                    <Td>
                      <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{entry.id}</Typography>
                    </Td>
                    <Td>
                      <Avatar src={entry.cover} alt={entry.contact} />
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {entry.description}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {entry.category}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {entry.contact}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {entry.description}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {entry.description}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {entry.description}
                      </Typography>
                    </Td>
                    <Td>
                      <Flex>
                        <IconButton
                          onClick={() => console.log("edit")}
                          label="Edit"
                          icon={<Pencil />}
                        />
                        <Box paddingLeft={1}>
                          <IconButton
                            onClick={() => console.log("edit")}
                            label="Delete"
                            icon={<Trash />}
                          />
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ContentLayout>
        </>
      </Layout>
    </Box>
  );
};

export default memo(HomePage);
