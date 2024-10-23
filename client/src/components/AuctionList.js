import React from "react";
import AuctionItem from "./AuctionItem";

const AuctionList = ({ items, onUpdate, onDelete, onBid }) => {
  console.log("AuctionItem");
  return (
    <div>
      {items?.data?.length === 0 ? (
        <p>No auction items available.</p>
      ) : (
        items?.data?.map((item) => (
          <AuctionItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onBid={onBid}
          />
        ))
      )}
    </div>
  );
};

export default AuctionList;
