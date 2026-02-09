from abc import ABC, abstractmethod
from domain.seller_information.entity.seller_information import SellerInformation


class ISellerInformationRepository(ABC):
    @abstractmethod
    def get_seller_information_by_product_id(self, product_id: str) -> SellerInformation:
        pass
