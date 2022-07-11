package com.alaz.ws.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    @JsonIgnore
    private Long id;

    @NotNull
    @Size(min = 4, max = 32)
    @UniqueUsername
    private String username;

    @NotNull
    @Email
    @Size(min = 4, max = 255)
    private String email;

    @NotNull
    @Size(min = 8, max = 64)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).*$", message = "must include 0-9, a-z and A-Z")
    private String password;

    private String image;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() { return AuthorityUtils.createAuthorityList("Role_user"); }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() { return true; }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() { return true; }


}
