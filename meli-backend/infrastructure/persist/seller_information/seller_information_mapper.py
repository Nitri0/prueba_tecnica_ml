from application.dto.detail_product_output_dto import SellerInformationDto
from domain.seller_information.entity.seller_information import SellerInformation


class SellerInformationMapper:
    @staticmethod
    def to_seller_information_dto(seller_information_entity: SellerInformation) -> SellerInformationDto:
        return SellerInformationDto(
            name=seller_information_entity.name,
            oficial_check=seller_information_entity.oficial_check,
            quantity_products=seller_information_entity.quantity_products,
            url_store=seller_information_entity.url_store
        )
