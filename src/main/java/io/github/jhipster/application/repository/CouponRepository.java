package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Coupon;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Coupon entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

}
