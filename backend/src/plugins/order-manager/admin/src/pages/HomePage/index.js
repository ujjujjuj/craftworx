import React, { memo } from "react";
import pluginId from "../../pluginId";
import { Typography } from "@strapi/design-system/Typography";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { useState, useEffect } from "react";
import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { getOrders } from "../../utils/api";
import { Flex } from "@strapi/design-system/Flex";
import { Link } from "@strapi/design-system/Link";
import ArrowLeft from "@strapi/icons/ArrowLeft";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [openOrder, setOpenOrder] = useState(null);

  useEffect(() => {
    getOrders().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(openOrder);
  }, [openOrder]);

  if (loading) return <LoadingIndicatorPage />;
  return (
    <div>
      <Box background="neutral100">
        {openOrder ? (
          <BaseHeaderLayout
            title="Order"
            subtitle={`Order ID: ${openOrder}`}
            navigationAction={
              <Link
                startIcon={<ArrowLeft />}
                onClick={() => {
                  setOpenOrder(null);
                }}
                style={{ cursor: "pointer" }}
              >
                Back
              </Link>
            }
            as="h2"
          />
        ) : (
          <>
            <BaseHeaderLayout
              title="Order Manager"
              subtitle="Manage the placed orders here"
              navigationAction={
                <Link
                  startIcon={<ArrowLeft />}
                  disabled
                  style={{ cursor: "pointer" }}
                >
                  Back
                </Link>
              }
              as="h2"
            />
            <Box padding={8}>
              <Table
                colCount={7}
                rowCount={data.length}
                onClick={(e) => {
                  // console.log(e.target.closest("tr").dataset.orderindex);
                  setOpenOrder(
                    e.target.closest("tr").dataset.orderindex || null
                  );
                }}
              >
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">ID</Typography>
                    </Th>
                    <Th>
                      <Typography variant="sigma">Name</Typography>
                    </Th>
                    <Th>
                      <Flex justifyContent="right" alignItems="right">
                        <Typography variant="sigma">Payment Status</Typography>
                      </Flex>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((order) => (
                    <Tr
                      key={order.orderId}
                      style={{ cursor: "pointer" }}
                      data-orderindex={order.orderId}
                    >
                      <Td>
                        <Typography textColor="neutral800">
                          {order.orderId}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography textColor="neutral800">
                          {order.transactionId}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography textColor="neutral800">
                          {order.isConfirmed ? "Completed" : "Incomplete"}
                        </Typography>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </>
        )}

        {/* <pre>{JSON.stringify(data)}</pre> */}
      </Box>
    </div>
  );
};

export default memo(HomePage);
