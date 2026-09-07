import InventoryPageHeader from "../components/AdminComponent/Inventory/InventoryPageHeader";
import InventoryToolbar from "../components/AdminComponent/Inventory/InventoryToolbar";
import InventoryTable from "../components/AdminComponent/Inventory/InventoryTable";

function InventoryPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <InventoryPageHeader />

      <InventoryToolbar />

      <InventoryTable />
    </div>
  );
}

export default InventoryPage;